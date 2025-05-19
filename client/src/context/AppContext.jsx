import { createContext, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [credits, setcredits] = useState(false);
  const [image, setimage] = useState(false);
  const [resultimage, setresultimage] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  // Load user credits
  const loadingcredits = async () => {
    try {
      const token = await getToken({ template: "default" });

      if (!token) {
        toast.error("User not authenticated. Please login again.");
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setcredits(data.credits);
      } else {
        toast.error(data.message || "Failed to load credits.");
      }
    } catch (error) {
      console.error("❌ loadingcredits error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Remove background from image
  const removeBG = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      setimage(image);
      setresultimage(false);
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      if (image) formData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/api/image/removebg`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setresultimage(data.resultImage);
        if (data.creditBalance !== undefined) {
          setcredits(data.creditBalance);
        }
      } else {
        toast.error(data.message);
        if (data.creditBalance !== undefined) {
          setcredits(data.creditBalance);
          if (data.creditBalance === 0) {
            navigate("/buy");
          }
        }
      }
    } catch (error) {
      console.error("❌ removeBG error:", error);
      toast.error(error.message);
    }
  };

  // Value provided to context
  const value = {
    credits,
    setcredits,
    loadingcredits,
    backendUrl,
    image,
    setimage,
    removeBG,
    resultimage,
    setresultimage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
