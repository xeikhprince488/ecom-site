import { Button } from "@/components/ui/button";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Handle upload of feature image
  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  // Handle deletion of feature image
  function handleDeleteFeatureImage(imageId) {
    console.log("Deleting image with ID:", imageId); // Log the ID
  
    if (imageId) {
      // Dispatch delete feature image action
      dispatch(deleteFeatureImage(imageId)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages()); // Refresh the image list
        }
      });
    } else {
      console.error("No image ID found");
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages()); // Fetch feature images when the component mounts
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem._id}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <button
                  onClick={() => handleDeleteFeatureImage(featureImgItem._id)} // Pass the _id here
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
