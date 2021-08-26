import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";
import {
  IPostFetchHitsData,
  IPostFetchData,
} from "app/utility/interface/post-data";
import { GetPostsData } from "app/services/post-fetch-service";
import { HttpStatusCodes } from "app/utility/enums/http-status-codes";
import { ALL_DATA_FETCHED, COULD_NOT_LOAD_DATA } from "app/utility/constants";
import { FETCH_DATA_INTERVAL_TIME } from "app/configs";
import DialogBox from "../DialogBox";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "#ccc",
    paddingBottom: "2%",
  },
  tableCell: {
    border: "1px solid #aaa",
  },
  tableHeadCell: {
    border: "1px solid #aaa",
    position: "sticky",
  },
  filterDiv: {
    margin: "0px !important",
    // width: "98%",
  },
  searchContainer: {
    paddingBottom: "2%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "3% 0",
  },
  postListContainer: {
    padding: "16px",
  },
  searchInput: {
    width: "100%",
  },
  noData: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface IValue {
  value: string;
}

interface ISearch {
  search: string;
}

const columns = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "author",
    label: "Author",
  },
  {
    id: "url",
    label: "URL",
    format: (value: IValue) => (value ? value : "-"),
  },
  {
    id: "created_at",
    label: "Crated Date",
    format: (value: IValue) => (value ? value : "-"),
  },
];

const PostsData = React.memo(() => {
  const classes = useStyles();
  const [allPostData, setPostData] = useState<IPostFetchHitsData[]>([]);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<IPostFetchHitsData>();
  const [open, setOpen] = useState(false);
  const currentPage = useRef<number>(null);
  const [
    lastElementInsideTableForCheckingVisibilityRef,
    isLastElementInsideTableVisible,
  ] = useInView();

  const formik = useFormik<ISearch>({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const dataEndingRef = useCallback(
    (node) => {
      lastElementInsideTableForCheckingVisibilityRef(node);
    },
    [lastElementInsideTableForCheckingVisibilityRef]
  );

  const getList = useCallback(async () => {
    const page: number = currentPage.current ? currentPage.current : 0;
    currentPage.current = page + 1;
    const res = await GetPostsData(page);
    if (res.data && res.status === HttpStatusCodes.Ok) {
      const dataList: IPostFetchHitsData[] = res.data.hits;
      if (page >= res.data.nbPages) {
        setAllDataFetched(true);
        toast.info(ALL_DATA_FETCHED);
      }

      setPostData((allreadyLoadedData) => [
        ...allreadyLoadedData.filter(
          (item: IPostFetchHitsData) =>
            !dataList.some(
              (i: IPostFetchHitsData) => i.objectID === item.objectID
            )
        ),
        ...dataList,
      ]);
    } else {
      toast.error(COULD_NOT_LOAD_DATA);
    }
  }, []);

  const handleOpenDetailPopup = () => {
    setOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setOpen(false);
  };

  const handleRowClick = useCallback((data: IPostFetchHitsData) => {
    setSelectedRowData(data);
    handleOpenDetailPopup();
  }, []);

  useEffect(() => {
    if (
      isLastElementInsideTableVisible &&
      allPostData &&
      allPostData.length > 0 &&
      !allDataFetched
    ) {
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastElementInsideTableVisible]);

  useEffect(() => {
    let fetchData: any;
    if (!allDataFetched) {
      getList();
      fetchData = setInterval(() => {
        getList();
      }, FETCH_DATA_INTERVAL_TIME);
    }
    return () => {
      clearInterval(fetchData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDataFetched]);

  const { search } = formik.values;

  const filteredData: IPostFetchHitsData[] = allPostData.filter(
    (item: IPostFetchHitsData) => {
      if (search.trim()) {
        return (
          item.author?.toLowerCase().includes(search.trim().toLowerCase()) ||
          item.url?.toLowerCase().includes(search.trim().toLowerCase()) ||
          item.title?.toLowerCase().includes(search.trim().toLowerCase())
        );
      } else {
        return true;
      }
    }
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.postListContainer}>
        <Box className={classes.searchContainer}>
          <TextField
            id="outlined-basic"
            label="Search post"
            variant="outlined"
            name="search"
            value={search}
            onChange={formik.handleChange}
            className={classes.searchInput}
          />
        </Box>
        {filteredData && filteredData.length > 0 ? (
          <Box>
            <TableContainer className={classes.filterDiv}>
              <Table style={{ position: "relative" }} aria-label="table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        className={classes.tableHeadCell}
                        key={column.id}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item: any, rowIndex) => (
                    <TableRow
                      hover
                      style={{ cursor: "pointer" }}
                      tabIndex={-1}
                      key={rowIndex}
                      onClick={() => handleRowClick(item)}
                    >
                      {columns.map((column, columnIndex) => {
                        const value = item[column.id];
                        return (
                          <TableCell
                            className={classes.tableCell}
                            key={`${rowIndex}${columnIndex}`}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box>
            <div className={classes.noData}>
              <Typography variant="body1"> No data found </Typography>
            </div>
          </Box>
        )}
        <div ref={dataEndingRef} style={{ opacity: "0" }}>
          End of data
        </div>
      </Box>
      <DialogBox
        open={open}
        close={handleCloseDetailPopup}
        data={selectedRowData}
      />
    </Box>
  );
});

export default PostsData;
