import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const TRIPO_API_KEY = process.env.TRIPO_API_KEY;
const BASE_URL = "https://api.tripo3d.ai/v2/openapi";

const headers = {
  Authorization: `Bearer ${TRIPO_API_KEY}`,
};

// Upload image to get file_token
export const uploadImage = async (filePath, mimeType) => {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  console.log("creating image token", headers);

  const response = await axios.post(`${BASE_URL}/upload/sts`, form, {
    headers: {
      ...headers,
      ...form.getHeaders(),
    },
  });

  console.log(response);
  console.log(response.data.data.image_token);
  return response.data.data.image_token;
};

// Create model generation task
export const createModelTask = async (fileToken, fileType = "jpg") => {
  console.log("creating model task");
  const body = {
    type: "image_to_model",
    file: {
      type: "jpg", // or "jpg", depending on your file
      file_token: fileToken,
    },
    orientation: "align_image",
  };
  console.log(body);
  const response = await axios.post(`${BASE_URL}/task`, body, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  console.log(response);
  return response.data.data.task_id;
};

// Poll task status
export const getTaskStatus = async (taskId) => {
  const response = await axios.get(`${BASE_URL}/task/${taskId}`, {
    headers,
  });

  return response.data.data;
};
