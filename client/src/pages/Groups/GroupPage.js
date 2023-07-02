import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar2 } from "../../components/Navbar/Navbar2";
const GroupPage = () => {
  const { genre, id } = useParams();
  localStorage.setItem("genre",genre);
  localStorage.setItem("id",id);
  const [group, setGroup] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [tgenre, setTgenre] = useState(null);
  const [tid, setTid] = useState(null);
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

  useEffect(() => {
    // console.log(materials);
  }, [materials]);


  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        	 <Navbar2/>
      <center>
        <h1>{group.title}</h1>
        <p>{group.description}</p>

        <h2>Materials:</h2>
        {materials.length === undefined ? (
          <p>No materials found.</p>
        ) : (
          <ul>
            {materials.map((material) => (
              <li key={material.id}>
                {material.filename} {material.contentType}
              </li>
            ))}
          </ul>
        )}
      </center>
    </div>
  );
};

export default GroupPage;
