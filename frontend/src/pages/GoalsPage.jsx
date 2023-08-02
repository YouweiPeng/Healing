// import Ali from '../images/Ali.jpg';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
import PageHomeButton from '../components/PageHomeButton';
import { useGlobalContext } from '../context';
import axios from 'axios';
import { useEffect, useState } from 'react';
const GoalsPage = () => {
    const {user}= useGlobalContext();
    const navigate = useNavigate();
    const{Goals, setGoals} = useGlobalContext();
    const { isSidebarExpanded } = useGlobalContext();
    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get_goal/', { params: { CustomerId: user.CustomerId } });
            setGoals(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchGoals();
    }, []);
    const handleFinish=(event)=>{
        const newGoals = [...Goals];
        newGoals.map((goal)=>{
            console.log(event.currentTarget.id)
            if(goal.GoalId === parseInt(event.currentTarget.id)){
                goal.Finished = true;
                const data = {GoalId: event.currentTarget.id};
                try{
                    const response = axios.patch('http://127.0.0.1:8000/api/update_goal/', data);
                    console.log(response);
                    }catch(error){
                        console.log(error);
                    }
            }
        })
        setGoals(newGoals);
        console.log(newGoals);
    

    }
    const handleDelete=(event)=>{
        const newGoals = [...Goals];
        newGoals.map((goal)=>{
            if(goal.GoalId === parseInt(event.currentTarget.id)){
                newGoals.splice(newGoals.indexOf(goal),1);
                try{
                    const response = axios.delete(`http://127.0.0.1:8000/api/delete_goal/${event.currentTarget.id}`);
                    }catch(error){
                        console.log(error);
                    }
            }
        }
        )
        setGoals(newGoals);
    }
    const handleAdd=()=>{
        if (document.getElementsByClassName('input-Your-Goal')[0].value === '') {
            alert('Please enter your goal');
            return;
          }
        if (document.getElementsByClassName('input-Goal-comment')[0].value === '') {
            alert('Please enter your goal comment');
            return;
            }
        if (document.getElementsByClassName('input-Goal-date')[0].value === '') {
            alert('Please enter your goal due date');
            return;
            }
        const newGoal = {
            CustomerId: user.CustomerId,
            title: document.getElementsByClassName('input-Your-Goal')[0].value,
            comment: document.getElementsByClassName('input-Goal-comment')[0].value,
            dueDate: document.getElementsByClassName('input-Goal-date')[0].value,
            Finished: false
        }
        const createGoal = async (newGoal) => {
            try{
                const response = await axios.post('http://127.0.0.1:8000/api/create_goal/', newGoal);
                setGoals((prevGoals) => [...prevGoals, newGoal]);
                document.getElementsByClassName('input-Your-Goal')[0].value = '';
                document.getElementsByClassName('input-Goal-comment')[0].value = '';
                document.getElementsByClassName('input-Goal-date')[0].value = '';
                // window.location.reload();
                }catch(error){
                    console.log(error);
                }
        }
        createGoal(newGoal);
        
    }

    const compareDates = (dateStr1, dateStr2) => {
        const date1 = new Date(dateStr1);
        const date2 = new Date(dateStr2);
      
        if (date1 <= date2) {
          return true;
        } else if (date1 > date2) {
          return false; 
        }
        }
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

        <div className='Goal-page-container' style={{ marginLeft: isSidebarExpanded ? '200px' : '90px'}}>
        <SideBar/>
        <PageHomeButton/>
        <div className='Add-Goals-div'>
        <h1>Add your goals</h1>
            <div className='Goal-grid-adding'>
            <input className='input-Your-Goal' type="text" placeholder='Your Goal' />
            <input className='input-Goal-comment' type="text" placeholder='Goal Comment' />
            <input className='input-Goal-date' type="date" placeholder='Goal Comment' 
            min={new Date().toISOString().split('T')[0]}
            />
            <button className='Add-goal-button' onClick={handleAdd}>Add</button>
            </div>
        </div>
        <div className='Goals-div'>
            <h1>My Goals</h1>
            <div className='Goal-grid'>
            <h5>Your Goal</h5>
            <h5>Goal Comment</h5>
            <h5>Goal dueDate</h5>
            <h5>Goal status</h5>
            </div>
            {
                Goals.filter((goal) => goal.Finished === false).length === 0 ? (
                    <h4>You don't have any goal added at this moment, add them up!</h4>
                  ) :
                Goals.map((goal)=>{
                    const{ GoalId, title, comment, dueDate, Finished} = goal;
                    if(Finished===false){
                    return(
                        <div className='Goal-grid'>
                        <p>{title}</p>
                        <p>{comment}</p>
                        <p
                        style={{color: compareDates(dueDate, new Date().toISOString().split('T')[0]) ? 'red' : 'black',}}
                        >{goal.dueDate}</p>
                        <p>{Finished?'Finished':'On the way'}</p>
                        <button className='Finish-goal-button' id={GoalId} onClick={handleFinish}>Finish</button>
                        </div>
                    )
                    }
            })
        }
            
        </div>

        <div className='Finished-Goals-div'>
            <h1>Finished Goals</h1>
            <div className='Goal-grid'>
            <h5>Your Goal</h5>
            <h5>Goal Comment</h5>
            <h5>Goal Finish date</h5>
            <h5>Goal status</h5>
            </div>
            {
            Goals.filter((goal) => goal.Finished === true).length === 0 ? (
                <h4>The process of accomplishing a goal is enjoyable in itself.</h4>
                ) :
                Goals.map((goal)=>{
                    const{id, title, comment, dueDate, Finished} = goal;
                    if(goal.Finished===true){
                    return(
                        <div className='Goal-grid'>
                        <p>{goal.title}</p>
                        <p>{goal.comment}</p>
                        <p>{new Date().toISOString().split('T')[0] }</p>
                        <p>{goal.Finished?'Finished':'On the way'}</p>
                        <button className='delete-goal-button' id={goal.GoalId} onClick={handleDelete}>Delete</button>
                        </div>
                    )
                    }
            })
        }
        </div>
        </div>
      </motion.div>
    );
  };
  
  export default GoalsPage;