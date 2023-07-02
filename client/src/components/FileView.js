import "./file.css"
import { Button } from "@mantine/core";

const FileView = (props) => {
    const {_id,filename,isPdf,isImage,canpreview} = props
    return (
      <>
        <div className="file-cont" key={_id}>
          <i className="bi bi-file-earmark" style={{ fontSize: "50px" }} />
          <div className="text-cont">
            <h3 className="file-name">{filename}</h3>
            <Button color="teal" compact disabled={!canpreview}>
              Preview
            </Button>
          </div>
        </div>
      </>
    );
}

export default FileView