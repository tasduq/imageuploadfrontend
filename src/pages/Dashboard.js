import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Selectimage from '../components/Selectimage';
import { uploadImages, getImages } from '../Connection/Images';

const Dashboard = () => {
  const [images, setImages] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const handleSelectedImages = data => {
    // console.log(data);
    setSelectedImages(data);
  };

  const handleUpload = async () => {
    setSaving(true);
    let res = await uploadImages({ images: selectedImages });
    if (res.data.success === true) {
      // setImages(res.data.images);
      alert(res.data.message);
      setUpdate(true);
      setSaving(false);
    } else {
      alert('No Images Found');
      setSaving(false);
    }
  };

  const handleGetImages = async () => {
    let res = await getImages();
    if (res.data.success === true) {
      setImages(res.data.images);
    } else {
      alert('No Images Found upload Some');
    }
  };
  React.useEffect(() => {
    handleGetImages();
    setUpdate(false);
  }, [update === true]);
  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Paper
              style={{ width: '100%', minHeight: '90vh', height: 'auto' }}
              className="m-3 p-3"
            >
              {images &&
                images.map(image => {
                  return (
                    <div className="d-flex ">
                      {image.images.map(singleImage => {
                        return (
                          <div
                            class="card img-fluid"
                            style={{ width: '18rem' }}
                          >
                            <img
                              src={singleImage}
                              class="card-img-top"
                              alt="..."
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

              <p>
                {selectedImages.length > 0
                  ? `${selectedImages.length} images Selected`
                  : 'No images Selected'}
              </p>
              <Selectimage selectedImages={handleSelectedImages} />
              <br />
              {saving === true ? (
                <button class="btn btn-success" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Loading...</span>
                </button>
              ) : (
                <button onClick={handleUpload} className="btn btn-success">
                  Upload Images
                </button>
              )}
            </Paper>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
