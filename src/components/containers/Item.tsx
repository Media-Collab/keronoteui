"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Box, Stack, Typography, IconButton, Modal } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart } from "@mdi/js";

interface ItemProps {
  key: number;
  content: string;
  currentPage: number;
}

const Item: React.FC<ItemProps> = ({ key, content, currentPage }) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const breakPoint = useMediaQuery("(min-width:900px)");
  const fullscreenRef = useRef(null);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleModalOpen = () => {
    activarPantallaCompleta();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const activarPantallaCompleta = () => {
    const elemento = fullscreenRef.current;
    const elemento2 = document.getElementById("modalinfoo");
    // debugger;
    // if (elemento2) {
    //   if (elemento2.requestFullscreen) {
    //     elemento2.requestFullscreen();
    //   } else if (elemento2.mozRequestFullScreen) {
    //     elemento2.mozRequestFullScreen();
    //   } else if (elemento2.webkitRequestFullscreen) {
    //     elemento2.webkitRequestFullscreen();
    //   } else if (elemento2.msRequestFullscreen) {
    //     elemento2.msRequestFullscreen();
    //   }
    // }
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
      }}
      key={key}
      id="modalinfoo"
    >
      <Typography
        variant="h6"
        style={{ marginBottom: "auto", fontWeight: "bold" }}
      >
        {content}-page: {currentPage}
      </Typography>
      <Box
        position="relative"
        width={"100%"}
        height={300}
        sx={{
          cursor: "zoom-in",
        }}
      >
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
        <Typography sx={{ mr: 1 }}>@{content}</Typography>
      </Stack>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          ref={fullscreenRef}
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
            maxWidth: "80vw", // Establece un ancho máximo para el modal
            height: breakPoint ? "38rem" : "70vh",
            overflow: "auto",
          }}
        >
          <Box
            position="relative"
            width={"100%"}
            height={breakPoint ? "26rem" : "70vw"}
          >
            <Image
              src="https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_1280.jpg"
              alt="Image"
              layout="fill"
              objectFit="contain"
              // Añade el evento para activar pantalla completa
            />
          </Box>
          <Stack direction="column" alignItems="left">
            <IconButton onClick={handleLike} color="primary">
              <Icon path={liked ? mdiHeart : mdiHeartOutline} size={1} />
              <Typography>{likes} Likes</Typography>
            </IconButton>

            {/* close modal */}
            <IconButton onClick={handleModalClose} color="primary">
              <Typography>Close</Typography>
            </IconButton>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Item;
