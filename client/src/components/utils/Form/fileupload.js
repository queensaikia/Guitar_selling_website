import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
    // state={

    // }
    // }
    //below creating constructor is the same thing as above doing by creating state
    //as above state method is newer version than the below constructor.
    constructor(){
        super();
        this.state = {
            uploadedFiles:[],
            uploading:false
        }
    }

    onRemove = (id) => {
        axios.get(`/api/users/removeimage?public_id=${id}`).then(response=>{
            let images = this.state.uploadedFiles.filter(item=>{
                return item.public_id !== id;
            });

            this.setState({
                uploadedFiles: images
            },()=>{
                //below line tells the parents that is imageHandler that state of images is changed
                this.props.imagesHandler(images)
            })
        })
    }

    showUploadedImages = () => (
        this.state.uploadedFiles.map(item=>(
            <div className="dropzone_box"
                key={item.public_id}
                onClick={()=> this.onRemove(item.public_id)}
            >
                <div 
                    className="wrap"
                    style={{background:`url(${item.url}) no-repeat`}}
                >
                </div>
            </div>
        ))
    )

    onDrop = (files) => {
        this.setState({uploading:true});
        let formData = new FormData();
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);
 
        axios.post('/api/users/uploadimage',formData,config)
        .then(response => {
 
             console.log(response.data)
 
             this.setState({
                 uploading:false,
                 //below array list of previous uoploaded files and newly uploaded files
                 uploadedFiles:[
                     ...this.state.uploadedFiles,
                     response.data
                 ]
             },()=>{
                 //receives properties from rendr <fileUpload> imageHndler function from add_product file.
                 this.props.imagesHandler(this.state.uploadedFiles)
             })
        });
     }
    
     showUploadedImages = () => (
        this.state.uploadedFiles.map(item=>(
            <div className="dropzone_box"
                key={item.public_id}
                onClick={()=> this.onRemove(item.public_id)}
            >
                <div 
                    className="wrap"
                    style={{background:`url(${item.url}) no-repeat`}}
                >
                </div>
            </div>
        ))
    )
    
    //reset image array to null after submit
    static getDerivedStateFromProps(props,state){
        if(props.reset){
            return state = {
                uploadedFiles:[]
            }
        }
        return null;
    }

    render() {
        return (
            <div>
               <section>
                    <div className="dropzone clear">
                        {/* when we click on the fontawesome icon our gallery opens to upload images */}
                        <Dropzone
                            onDrop={(e)=>this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >   
                            <div className="wrap">
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                />
                            </div>
                        </Dropzone>
                        {/* below function described above shows uploaded images as an array  */}
                        { this.showUploadedImages()}
                        {
                            this.state.uploading ?
                            <div className="dropzone_box" style={{
                                textAlign: 'center',
                                paddingTop: '60px'
                            }}>
                                <CircularProgress
                                    style={{color:'#00bcd4'}}
                                    thickness={7}
                                />
                            </div>
                            :null
                        }

                        </div>
                </section>         
            </div>
        )
    }
}

export default Fileupload;