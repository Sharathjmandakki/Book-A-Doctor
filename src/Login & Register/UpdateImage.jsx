import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function UpdateImage() {
    const username = window.localStorage.getItem("username")
    const navigate=useNavigate();
    const updateImage = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('image');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('username', username);
        formData.append('image', file);
        try {
            const response = await axios.post("http://localhost:8080/updateimg", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            document.getElementById("add").innerHTML = response.data
            if(response.data==="Updated"){
                navigate("/login",{replace:true})
            }
        } catch (error) {
            document.getElementById("error").innerHTML = 'Error uploading data'
        }
    }
    return (
        <div className='flex items-center justify-center '>
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6  " onSubmit={updateImage}>
                    <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white">Update Image | {username}</h5>
                    <p id='error' className='text-red-400'></p><p id='add' className='text-green-400'></p>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                        <input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="image" name="image" accept="image/*" />
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or JPEG(MAX. 800x400px).</p>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Image</button>
                </form>
            </div>
        </div>
    )
}


