"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Stack, Fab, Typography, IconButton, Modal } from "@mui/material";

import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart } from "@mdi/js";

interface ItemProps {
  content: string;
}

const Home = () => {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      // Simulación de datos de items para mostrar en el ejemplo
      const data: string[] = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 9",
        "Item 10",
      ];

      setItems((prevItems) => [...prevItems, ...data]);
      setLoading(false);
    };

    fetchItems();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight * 0.65 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Stack
        component="div"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        width={"100%"}
      >
        {items.map((item, index) => (
          <Item key={index} content={item} />
        ))}
        {loading && <p>Loading...</p>}
      </Stack>
      <FloatingButton>{page}</FloatingButton>
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ content }) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box
      component="div"
      margin={"auto"}
      textAlign="center"
      color="secondary"
      border="1px solid #e0e0e0"
      borderRadius={3}
      width={300}
      height={300}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        mt: 1,
        mb: 1,
        mr: 1,
        ml: 1,
      }}
    >
      <Typography
        variant="h6"
        style={{ marginBottom: "auto", fontWeight: "bold" }}
      >
        {content}
      </Typography>
      <Box position="relative" width={"100%"} height={300}>
        <Image
          src="https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_1280.jpg"
          alt="Image"
          layout="fill"
          objectFit="cover"
          onClick={handleModalOpen}
        />
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <IconButton onClick={handleLike} color="primary">
            <Icon path={liked ? mdiHeart : mdiHeartOutline} size={1} />
          </IconButton>
          <Typography>{likes} Likes</Typography>
        </Stack>
        <Typography sx={{mr: 1}}>@{content}</Typography>
      </Stack>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: "90%", // Cambia el ancho del modal al 90% del contenedor
            maxWidth: 600, // Establece un ancho máximo para el modal
            maxHeight: "555px"
          }}
        >
          <Typography variant="h6" id="modal-title" sx={{ marginBottom: 2 }}>
            {content}
          </Typography>
          <Box position="relative" width={"100%"} height={"30vw"}>
            <Image
              src="https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_1280.jpg"
              alt="Image"
              layout="fill"
              objectFit="contain"
            />
          </Box>
          <Stack direction="column" alignItems="left">
            <IconButton onClick={handleLike} color="primary">
              <Icon path={liked ? mdiHeart : mdiHeartOutline} size={1} />
            <Typography>{likes} Likes</Typography>
            </IconButton>
            <Typography >@{content}</Typography>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

const FloatingButton: React.FC = ({ children }: number) => {
  return (
    <Fab
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#f50057",
        color: "#fff",
      }}
    >
      <Typography variant="body1">{children}</Typography>
    </Fab>
  );
};

export default Home;
