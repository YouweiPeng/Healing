import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from '../components/PageHomeButton';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ArticlePage = () => {
  
  const { isSidebarExpanded } = useGlobalContext();
  const { articleTopics , setArticleTopics} = useGlobalContext();
  // State to track expanded tabs
  const [expandedTabs, setExpandedTabs] = useState({});

  // Toggle the expansion of a tab
  const toggleTabExpansion = (tabId) => {
    setExpandedTabs((prevTabs) => ({
      ...prevTabs,
      [tabId]: !prevTabs[tabId],
    }));
  };
  const handleLikeButton = (event) => {
    const NewArticle=[...articleTopics]
    NewArticle.map((item)=>{
      if(item.id === parseInt(event.currentTarget.id)){
        item.like=!item.like
      }
    })
    setArticleTopics(NewArticle);
  }

  // Sample article topics (You can replace this with your actual article topics)

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
      <div className="container" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px', position: 'relative' }}>
        <PageHomeButton />
        <h1>Article Page</h1>
        <SideBar />

        {/* Render the expandable tabs */}
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
              <h3>{topic.title}
              <button
                id={topic.id}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={handleLikeButton}
                >Like {topic.like?<AiFillHeart style={{fontSize:'20px',color:'red'}}/>:<AiOutlineHeart style={{fontSize:'20px',color:'red'}}/>}
               </button>
              </h3>
              {expandedTabs[topic.id] ? (
                // If expanded, show "-" icon
                <button
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    fontSize: '20px',
                  }}
                  onClick={() => toggleTabExpansion(topic.id)}
                >
                  -
                </button>
              ) : (
                // If not expanded, show "+" icon
                <button
                id={topic.id}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    fontSize: '20px',
                  }}
                  onClick={() => toggleTabExpansion(topic.id)}
                >
                  +
                </button>
              )}
            </div>
            {expandedTabs[topic.id] && (
              <div style={{ padding: '10px', textAlign: 'left' }}>
                {topic.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ArticlePage;
