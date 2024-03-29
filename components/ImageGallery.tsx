import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Box, Backdrop, IconButton } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
// Define types
type Props = {
  imgSet: string[];
  show: number;
  setShow: Dispatch<SetStateAction<number>>;
};

const ImageGallery = ({ imgSet, show, setShow }: Props): JSX.Element => {
  const [imgNumber, setImgNumber] = useState(-1);
  const endNumber = imgSet.length - 1;

  useEffect(() => {
    show >= 0 && setImgNumber(show);
  }, [show]);

  const styles = {
    navIcons: {
      position: "absolute",
      bgcolor: "common.white",
      color: "common.black",
      boxShadow: 1,
      "&:hover": {
        bgcolor: "common.white",
        color: "common.black",
        transform: "scale(1.1)",
      },
    },
  };
  const closeGallery = () => {
    setShow(-1);
    setImgNumber(-1);
  };
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={show >= 0}>
      <ClickAwayListener
        onClickAway={() => {
          imgNumber >= 0 && closeGallery();
        }}
      >
        <Box sx={{ position: "relative", width: "80%", height: "90%", borderRadius: 8 }}>
          {imgSet[imgNumber] && (
            <Image
              src={imgSet[imgNumber]}
              fill
              alt={`S-control Instalacje fotowoltaiczne`}
              style={{ objectFit: "cover", borderRadius: 8 }}
              sizes="100vw"
            />
          )}

          <IconButton aria-label="close" onClick={closeGallery} sx={{ ...styles.navIcons, right: -12, top: -12 }}>
            <CloseIcon />
          </IconButton>
          {imgNumber > 0 && (
            <IconButton
              aria-label="previous"
              size="large"
              onClick={() => setImgNumber(imgNumber - 1)}
              sx={{ ...styles.navIcons, left: -70, top: "50%" }}
            >
              <ArrowForwardIosIcon sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
          )}
          {imgNumber < endNumber && (
            <IconButton
              aria-label="next"
              size="large"
              onClick={() => setImgNumber(imgNumber + 1)}
              sx={{ ...styles.navIcons, right: -70, top: "50%" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>
      </ClickAwayListener>
    </Backdrop>
  );
};

export default ImageGallery;
