import {useState} from 'react';
import Modal from 'react-modal';
import { useQuery, useMutation, gql } from '@apollo/client';

import '../styles/add-project-modal.scss'
// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

const ADD_PROJECT_MUTATION = gql`
    mutation addProject($title: String!, $description: String!) {
        addProject(title: $title, description: $description) {
            status
            data {
               id
               title
               description

            }
        }

    }


`

Modal.setAppElement('#root')
 
function AddProjectModal({isOpen, afterOpenModal, closeModal}){
    const [details, setDetails] = useState({
        title: '',
        description: '',
    })

    const [error, setError] = useState({
        isError: false,
        message: ''
    })

    const [addProject, { loading, data }] = useMutation(ADD_PROJECT_MUTATION, {
        variables: {
            title: details.title,
            description: details.description
        }, 
        onCompleted: ({addProject}) => {
            if (addProject.status !== "Success") {
                setError({isError: true, message: "Failed to add project"})
            } else {
                closeModal();
            }
        }
    })

    const handleTitleChange = (e) => {
        setDetails({...details, title: e.target.value})
    }
 
    const handleDescriptionChange = (e) => {
        setDetails({...details, description: e.target.value})

    }

    const checkDetails = () => {
        if (details.title.trim() === "" || details.description.trim() === ""){
         return false;
        }
        return true;
    }
 
    

    const handleSubmit = (e) => {
        if ( checkDetails() ) {

            console.log('handle sumbit')
            try {

                addProject()
            } catch (err) {
                console.log(err)
            }
        } else {
            setError({isError:true, message: "Fill the details correctly"})
        }
    }

    if (loading){ return <p>Loading...</p> }
    return (


        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        //   style={customStyles}
          contentLabel="Example Modal"
          className="add-project-modal"
        >

        <div class="add-project-box">

            <div class="add-project-box__header">
                <div class="add-project-box__header__heading">
                    Add New Project
                </div>
                <button
                 class="add-project-box__header__closebtn"
                 onClick={closeModal}>X</button>

            </div>

            <div class="add-project-box__content">

                <div class="add-project-box__content__title">
                    <label for="add-project-box__content__title">Title <small>Max Characters - 100</small></label>
                    <input id="add-project-box__content__title"
                    class="add-project-box__content__title"
                    placeholder="Title"
                    value={details.title}
                    onChange={handleTitleChange}
                    />
                </div>

                <div class="add-project-box__content__description">
                <label for="add-project-box__content__description">Description <small>Max Characters - 150</small></label>

                    <textarea id="add-project-box__content__description"
                    class="add-project-box__content__description"
                    placeholder="Description"
                    rows="5"
                    onChange={handleDescriptionChange}
                    >
                        {details.description}
                    </textarea>
                </div>

                <button onClick={handleSubmit} class="add-project-box__content__submitbtn">Add</button>
                {
                    error.isError &&
                    <div class="add=project-box__error">
                        {error.message}
                    </div>
                }
            </div>

        </div>
 

          
        </Modal>

    );
}

export default AddProjectModal;