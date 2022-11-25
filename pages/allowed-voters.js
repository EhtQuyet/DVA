import React, {useState, useEffect, useContext, useCallback} from "react";
import {useRouter} from "next/router";
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'

//internal import

import {VotingContext} from "../context/Voter";
import Styles from '../styles/allowedVoter.module.css'
import CREATOR from '../assets/images/creator.png'
import UPLOAD_IMAGE from '../assets/images/images.png'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'

function AllowedVoters() {

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: '',
    address: '',
    position: '',
  });

  const router = useRouter();
  const {uploadToIPFS, createVoter} = useContext(VotingContext);

  //-----voters image drop

  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
    console.log(url)
    setFileUrl(url);
  })

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000
  });

  console.log(fileUrl)
  return (
      <div className={Styles.createVoter__container}>
        <div>
          {fileUrl &&
          <div className={Styles.voterInfo}>
            <img src={fileUrl} alt="Voter Imge"/>
            <div className={Styles.voterInfo__paragraph}>
              <p>
                Name: <span> &nbps; {formInput.name}</span>
              </p>
              <p>
                Address: <span> &nbps; {formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                Position: <span> &nbps; {formInput.position}</span>
              </p>
            </div>
          </div>}

          {!fileUrl && (
              <div className={Styles.sideInfo}>
                <div className={Styles.sideInfo__box}>
                  <h4>Create candidate for voting</h4>
                  <p>
                    Bloeckchain voting orgainzation, provide etherum blockchain eco system
                  </p>
                  <p className={Styles.sideInfo__para}>
                    Contract Candidate
                  </p>
                </div>
                <div className={Styles.card}>
                  {/*{voterArray.map((element, idx)=>(*/}
                  {/*    <div key={idx + 1} className={Styles.card_box}>*/}
                  {/*        <div>*/}
                  {/*            <img src="" alt="Profile photo"/>*/}
                  {/*        </div>*/}
                  {/*        <div className={Styles.card_info}>*/}
                  {/*            <p>Name</p>*/}
                  {/*            <p>Address</p>*/}
                  {/*            <p>Details</p>*/}
                  {/*        </div>*/}
                  {/*    </div>*/}
                  {/*))}*/}
                </div>

              </div>
          )}
        </div>

        <div className={Styles.voter}>
          <div className={Styles.voter__container}>
            <h1>Create New Voter</h1>
            <div className={Styles.voter__container__box}>
              <div className={Styles.voter__container__box__div}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <div className={Styles.voter__container__box__div__info}>
                    <p>Upload File: JPG, PNG, GIF, WEBM Max 10MB </p>
                    <div className={Styles.voter__container__box__div__image}>
                      <Image
                          src={UPLOAD_IMAGE}
                          width={150}
                          height={150}
                          objectFit="contain"
                          alt="File Upload"
                      />
                    </div>
                    <p>Drag & Drop File</p>
                    <p>or Browse Media on you device</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.input__container}>
            <Input
                inputType="text"
                title="Name"
                placeholder="Voter Name"
                handleClick={(e) => {
                  setFormInput({...formInput, name: e.target.value})
                }}
            />
            <Input
                inputType="text"
                title="Address"
                placeholder="Voter Address"
                handleClick={(e) => {
                  setFormInput({...formInput, address: e.target.value})
                }}
            />
            <Input
                inputType="text"
                title="Position"
                placeholder="Voter Position"
                handleClick={(e) => {
                  setFormInput({...formInput, position: e.target.value})
                }}
            />

            <div className={Styles.button}>
              <Button
                  btnName="Authorized Voter"
                  handleClick={() => createVoter(formInput, fileUrl, router)}
              />
            </div>
          </div>
        </div>
        {/*---------------------------------*/}
        <div className={Styles.createdVoter}>
          <div className={Styles.createdVoter__info}>
            <Image src={CREATOR} alt="User Profile"/>
            <p>Notice For User</p>
            <p>
              Organizer <span>0x939939...</span>
            </p>
            <p>
              Only organizer of the voting contract can create voter for voting
            </p>
          </div>
        </div>

      </div>
  )
}

export default AllowedVoters