import axios from "axios";
import {  useForm } from "react-hook-form";
import { SERVER_URL } from "../constants";
import { Button } from "@mantine/core";
import { useState } from "react";

const FileUpload = (props) => {
    let {groupid} = props
    const {register,handleSubmit} = useForm()
    const [isLoading,setIsLoading] = useState(false)
    const [inputkey, setInputKey] = useState(Math.random().toString(36));
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("file",data.file[0])
        setIsLoading(true)
        const res = await axios.post(`${SERVER_URL}/file/upload/${groupid}`,formData)
        setIsLoading(false)
        setInputKey(Math.random().toString(36))
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div 
            style={{
                border: "1px solid",
                width: "400px",
                padding: "1.2rem",
                borderRadius: "10px"
            }}
        >
          <input
            key = {inputkey}
            placeholder="Add Material"
            {...register("file", { required: "Required" })}
            type="file"
          />
          <Button type="submit" loading={isLoading}>Submit Material</Button>
        </div>
      </form>
    );
}

export default FileUpload