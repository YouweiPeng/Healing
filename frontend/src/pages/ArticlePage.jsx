import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-modal'; 
import {IoMdCloseCircle} from 'react-icons/io';

const ArticlePage = () => {
  const { user } = useGlobalContext();
  const { isSidebarExpanded } = useGlobalContext();
  const { articleTopics, setArticleTopics } = useGlobalContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get_articles/');
      console.log(response.data);
      const data = response.data;
      setArticleTopics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);


  const articleContentStyle = {
    padding: '10px',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    backgroundColor: '#f0f0f0',
  };

  const openModal = (article) => {
    setCurrentArticle(article);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentArticle(null);
    setModalIsOpen(false);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      maxWidth: '80%',
      maxHeight: '80%',
      overflow: 'auto',
    },
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <motion.div
      initial="page-entering"
      animate="page-entered"
      exit="page-entering"
      variants={{
        'page-entering': { opacity: 0 },
        'page-entered': { opacity: 1 },
      }}
      transition={{ duration: 1 }}
    >
      <div style={{ marginLeft: isSidebarExpanded ? '200px' : '90px', position: 'relative' }}>
        <PageHomeButton />
        <h1>Article Page</h1>
        <SideBar />

        {articleTopics.map((topic) => (
          <div key={topic.id} style={{ marginTop: '20px', borderBottom: '1px solid #ccc' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                background: '#f0f0f0',
              }}
            >
              <h3>{topic.title}</h3>
              <button
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  marginLeft: '5px',
                  fontSize: '20px',
                }}
              >
                <GrView onClick={() => openModal(topic)} />
              </button>
            </div>
          </div>
        ))}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          {currentArticle && (
            <div>
              <h3 style={{textAlign:"center", fontWeight:'bold',marginBottom:"10px"}}>{currentArticle.title}</h3>
              <h5 style={{textAlign:"center",marginBottom:"12px"}}>By {currentArticle.author}</h5>
              <h6 style={{ textAlign: 'center', marginBottom: '12px' }}>Published in {formatDate(currentArticle.publishDate)}</h6>
              <IoMdCloseCircle
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '25px',
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: 'red',
                }}
                onClick={closeModal}
              >
                X
              </IoMdCloseCircle>
              <div style={articleContentStyle}>{currentArticle.content}</div>
            </div>
          )}
        </Modal>
      </div>
    </motion.div>
  );
};

export default ArticlePage;
