import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config";
import CardHead from "../Product/Views/CardElements/CardHead";
import sampleImg from "../../img/img.jpg";
import { PhotoCamera } from "@mui/icons-material";
import { FileUpload } from "@mui/icons-material";
import {
  Card,
  Box,
  CardActions,
  Collapse,
  Paper,
  Grid,
  Container,
  CardMedia,
  CardContent,
  Typography,
  Tab,
  Tabs,
  ThemeProvider,
  CardHeader,
  Avatar,
  Stack,
  IconButton,
  PagesOutlined,
  TextField,
  Input,
  TextareaAutosize,
  MenuItem,
  CircularProgress,
  Button,
} from "@mui/material";
import theme from "../../theme";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../store/User/userSlice";
import Carousel from "react-material-ui-carousel";

const addProduct = async (productInfo, token) => {
  try {
    const response = await axios.post(`${url}/product/new`, productInfo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: true, productId: response.data._id };
  } catch (error) {
    return { status: false, productId: undefined };
  }
};

const NewPost = (props) => {
  const [inProgress, setInProgress] = useState(false);
  const token = useSelector(getToken);
  const [productTitle, setProductTitle] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [files, setFiles] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);
  const user = useSelector(getUser);
  const [resultImage, setResultImage] = useState("");
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );

  window.addEventListener("resize", () => {
    setIsLandscape(window.matchMedia("(orientation: landscape").matches);
  });
  const [catagory, setCatagory] = useState("");
  const handleChange = (event) => {
    setCatagory(event.target.value);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([reader.result, ...previewSource]);
    };
  };
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    async function getUser() {
      const { data, status: responseStatus } = await axios.get(
        `${url}/catagories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCatagories(data.map((catagory) => catagory.name));
    }
    getUser();
  }, []);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFiles([...files, file]);
    previewFile(file);
  };
  const previewImage = previewSource.map((img) => (
    <img style={{ height: "300px" }} src={img} alt="chosen" />
  ));

  const handlePostSubmit = async (event) => {
    try {
      setInProgress(true);
      const { status, productId } = await addProduct(productInfo, token);
      files.forEach(async (singleFile) => {
        try {
          if (singleFile) {
            const formData = new FormData();
            formData.append("image", singleFile);
            await axios.post(`${url}/${productId}/add-image`, formData, {
              headers: { Authorization: `Bearer ${token}` },
            });
          }
        } catch (error) {
          console.error(error);
        }
      });
      if (status) {
        setInProgress("");
        setProductTitle("");
        setModel("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setPreviewSource([]);
        setFiles([]);
      }
      const fakeLoad = setTimeout(() => {
        setInProgress(false);
        return () => clearTimeout(fakeLoad);
      }, 200);
    } catch (error) {}
  };

  const productInfo = {
    name: productTitle,
    model,
    description,
    price,
    quantity,
    catagory,
    image: sampleImg,
  };
  const xPadding = isLandscape ? 16 : 0;
  if (inProgress) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          py: 4,
        }}
      >
        <CircularProgress
          size={56}
          variant="indeterminate"
          sx={{ color: "#4db6ac" }}
        />
      </Box>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Box mx={xPadding}>
        <Paper elevation={4}>
          <Card>
            <Box
              justifyContent={"space-between"}
              minHeight={500}
              maxHeight={500}
              p={1}
            >
              <CardHead product={{ owner: user, new: "now" }} />
              <CardContent>
                <Stack
                  spacing={2}
                  direction={isLandscape ? "row-reverse" : "reverse column"}
                >
                  <Stack
                    display={"flex"}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <TextField
                      value={productTitle}
                      onChange={(event) => setProductTitle(event.target.value)}
                      variant="filled"
                      label="Product Title"
                    />

                    <TextField
                      value={model}
                      onChange={(event) => setModel(event.target.value)}
                      variant="filled"
                      fullWidth
                      label={"Model"}
                    />

                    <TextField
                      multiline
                      minRows={3}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      maxRows={3}
                      variant="filled"
                      label={"Description"}
                    />
                    <Stack spacing={1} direction={"row"}>
                      <TextField
                        fullWidth
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        type={"number"}
                        variant="filled"
                        label={"Price"}
                      />
                      <TextField
                        fullWidth
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                        type={"number"}
                        variant="filled"
                        label={"Quantity"}
                      />
                    </Stack>
                    <TextField
                      variant="filled"
                      size="small"
                      select
                      value={catagory}
                      onChange={handleChange}
                      id="catagory"
                      label="Catagory"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {catagories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                  <Box
                    overflow={"clip"}
                    minWidth={450}
                    maxHeight={400}
                    maxWidth={600}
                    borderRadius={"0.2em"}
                  >
                    <Input
                      accept="image/*"
                      multiple
                      name="image"
                      // value={fileInputState}
                      onChange={handleFileInputChange}
                      id="product-image-button-file"
                      type="file"
                    />
                    <IconButton
                      color="primary"
                      onClick={async (event) => {
                        if (!previewSource) return;
                        //  await uploadImage(previewSource);
                      }}
                      aria-label="upload picture"
                      component="span"
                    >
                      <FileUpload />
                    </IconButton>

                    {previewSource.length !== 0 && (
                      <Carousel
                        indicators={true}
                        swipe
                        autoPlay={false}
                        cycleNavigation={false}
                        duration={200}
                        animation="fade"
                      >
                        {previewImage}
                      </Carousel>
                    )}
                    {/* {resultImage && (
                      <img
                        style={{ height: "300px" }}
                        src={resultImage}
                        alt="chosen"
                      />
                    )} */}
                  </Box>
                </Stack>
              </CardContent>
            </Box>
            <Box m={2}>
              <Button
                type="submit"
                onClick={handlePostSubmit}
                fullWidth
                variant="contained"
              >
                Post
              </Button>
            </Box>
          </Card>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default NewPost;
