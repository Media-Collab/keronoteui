export const uploadImage = async (file: any, snackbarRef: any) => {
  console.log("Saving img...");
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });
    const { fileUrl } = await res.json();
    // alert("Saved img! see the console (delete this in pages/canvas/functions.tsx)");
    console.log(fileUrl);
    snackbarRef("Image saved!", {
      variant: "success",
    });

    return fileUrl || "";
  } catch (error) {
    snackbarRef("Cloudinary err img", {
      variant: "error",
    });
    console.error("error: ", error);
  }
};

export const uploadBlob = async (file: any, snackbarRef: any) => {
  console.log("Saving blob...");
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadBlob", {
      method: "POST",
      body: formData,
    });
    const { fileUrl } = await res.json();
    // alert("Saved blob! see the console (delete this in pages/canvas/functions.tsx)");
    console.log(fileUrl);
    snackbarRef("Animatation saved!", {
      variant: "success",
    });

    return fileUrl || "";
  } catch (error) {
    console.error("error: ", error);
    snackbarRef("Cloudinary err animation", {
      variant: "error",
    });
  }
};
