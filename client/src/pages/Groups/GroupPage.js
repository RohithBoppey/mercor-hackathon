import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar2 } from "../../components/Navbar/Navbar2";
import { FileView } from "../../components/FileView"
import { PDFViewerComponent } from '../pdfviewer'
const GroupPage = () => {
  const { genre, id } = useParams();
  localStorage.setItem("genre",genre);
  localStorage.setItem("id",id);
  const [ind,setInd] = useState(0);
  const [file, setFile] = useState(null);
  const [group, setGroup] = useState(null);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/groups/${genre}/${id}`);
        const data = response.data;
        setGroup(data);
        // setMaterials(data.materials);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [genre, id]);

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/file/metadata/${id}`);
        const data = response.data;
        // console.log(data)
        setMaterials(data);
        // console.log(materials)
      } catch (error) {
        console.error('Error fetching material data:', error);
      }
    };

    fetchMaterialData();
  }, [materials,id]);

  const fetchmaterial = async (id)=>{
     const res = await axios.get(`http://localhost:5000/file/filedata/${id}`);
    //  console.log(res.data);
     setFile(res.data);
     setInd(1);
  }

  useEffect(() => {
    // console.log(materials);
  }, [materials]);


  if (!group) {
    return <div>Loading...</div>;
  }
  if(ind===0){
  return (
    <div>
        	 <Navbar2 />
      <center>
        <h1>{group.title}</h1>
        <p>{group.description}</p>

        <h2>Materials:</h2>
        {materials.length === undefined ? (
          <p>No materials found.</p>
        ) : (
          <div>
            {materials.map((material) => (
              <li key={material._id} onClick={()=>{fetchmaterial(material._id)}}>
                 {/* <FileView _id={material._id} filename={materials.filename} canpreview={materials.canpreview}/> */}
                {material.filename} {material.contentType}

              </li>
            ))}
          </div>
        )}
      </center>
    </div>
  );
  }
  else{
    return (
        <PDFViewerComponent pdfContent={file} />
    );
}
};

export default GroupPage;
