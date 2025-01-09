import { CircularProgress } from "@mui/material";
import { RootState } from "@store/store";
import React from "react";
import { useSelector } from "react-redux";


const Loader: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.common.isLoading)

    if (!isLoading) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 9999,
            }}
        >
            <CircularProgress />
        </div>
    );
};

export default Loader;
