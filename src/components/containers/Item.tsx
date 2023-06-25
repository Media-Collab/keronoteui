import Image from "next/image";
import Box from "@mui/material/Box";
// import { EyeIcon, TrashIcon } from "@heroicons/react/outline";
import Stack from "@mui/material/Stack";

const Item = ({ content }: any) => {
  return (
    <Box
      padding={2}
      margin={1}
      textAlign="center"
      color="secondary"
      backgroundColor="white"
      border="1px solid #e0e0e0"
      borderRadius={5}
      width={300}
      height={300}
    >
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        <h3>{content}</h3>
        {/* <EyeIcon className="block h-6 w-6" aria-hidden="true" />
        <TrashIcon className="block h-6 w-6" aria-hidden="true" /> */}
      </Stack>
      <Image
        src="https://cdn.pixabay.com/photo/2022/04/18/02/24/architecture-7139263_960_720.jpg"
        alt="Image"
        width={200}
        height={200}
      />
    </Box>
  );
};

export default Item;
