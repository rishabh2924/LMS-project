import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layout.Api'
import React, { useEffect, useState } from 'react'
import { styles } from '../../styles/style'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import toast from 'react-hot-toast'

type Props = {}

const EditFaq = (props: Props) => {
    const {data,isLoading,refetch} = useGetHeroDataQuery("FAQ",{
        refetchOnMountOrArgChange:true
    })
    const [editLayout,{isSuccess, error}] = useEditLayoutMutation()
    const [questions , setQuestions] = useState<any>([])

    useEffect(()=>{
        if(data){
            setQuestions(data?.layout?.faq)
        }
      if(isSuccess){
        refetch()
        toast.success("FAQ updated successfully")
      }
      if(error){
        if('data' in error){
          const errorData = error as any
          toast.error(errorData?.data?.message)
        }
      }

       
        
    },[data,isSuccess,error])
    
    
    const togleQuestion = (id:any)=>{
        setQuestions((prev:any)=>{
            return prev.map((item:any)=>{
                if(item._id === id){
                    return {...item,active:!item.active}
                }
                else return item
            })
        })
    }
    const handleQuestionChange = (id:any,value:any)=>{
        setQuestions((prev:any)=>{
            return prev.map((item:any)=>{
                if(item._id === id){
                    return {...item,question:value}
                }
                else return item
            })
        })
    }
    const handleAnswerChange = (id:any,value:any)=>{
        setQuestions((prev:any)=>{
            return prev.map((item:any)=>{
                if(item._id === id){
                    return {...item,answer:value}
                }
                else return item;
            })
        })
    }
    const newFaqHandler =()=>{
      setQuestions([
        ...questions,
        {
          questions:"",
          answer:"",
        }
      ])
    }
    const areQuestionsUnchanged = (
      originalQuestions:any[],
      newQuestions:any[]
    )=>{
      return JSON.stringify(originalQuestions)===JSON.stringify(newQuestions)
    }

    const isAnyQuestionEmpty = (questions:any[])=>{
      return questions.some((item:any)=>{
        return item.question==="" || item.answer===""
      })
    }

    const handleEdit = async()=>{
      console.log(questions);
      
      if(!areQuestionsUnchanged(data?.layout?.faq,questions)&& !isAnyQuestionEmpty(questions)){
        await editLayout({type:"FAQ",faq:questions})
      }
    }

  return (
    <div className='w-[90%] ml-10'>
      <div className="mt-12">
        <dl className='space-y-8'>
          {
            questions?.map((item:any)=>
              <div className={`${item._id!== questions[0]?._id && "border-t"} border-green-200 pt-6 `} key={item._id} >
                <dt className='text-lg ' >
                  <button className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none '
                  onClick={()=>togleQuestion(item._id)}>
                    <input type="text"  className={`${styles.input} border-none`}
                    value={item.question}
                    onChange={(e:any)=>{
                      handleQuestionChange(item._id,e.target.value)
                    }}
                    placeholder='Add your question...' />
                    <span className='ml-6 flex-shrink-0'>
                      {item.active?(
                        <HiMinus className='w-6 h-6' />
                      ):(
                        <HiPlus className='w-6 h-6' />
                      )}
                    </span>
                  </button>
                </dt>
                {item.active && (
                  <dd className='mt-2 pr-12'>
                    <input className={`${styles.input} border-none `} value={item.answer} onChange={(e:any)=>handleAnswerChange(item._id,e.target.value)} 
                    placeholder='Add your answer...' />
                    <span className='ml-6 flex-shrink-0'>
                        <AiOutlineDelete className='dark:text-white text-black text-lg cursor-pointer'
                        onClick={()=>{
                          setQuestions((prev:any)=>prev.filter((item:any)=>item._id!==item._id))
                        }} />
                        
                    </span>
                  </dd>
                )}
              </div>
            )
          }
        </dl>

      <br />
      <br />
      <IoMdAddCircleOutline
      className='dark:text-white text-black text-[25px] cursor-pointer '
      onClick={newFaqHandler}/>
      </div>
          <div className={`${
            styles.button
          } !w-[100px] !min-h-40px  dark:text-white text-black bg-[#cccccc34]
          ${
            areQuestionsUnchanged(data?.layout?.faq, questions) || isAnyQuestionEmpty(questions) ?
            "!cursor-not-allowed":
            "!cursor-pointer !bg-[#42d383]"
          }  !rounded absolute bottom-12 right-12`}
          onClick={
            areQuestionsUnchanged(data?.layout?.faq, questions) || isAnyQuestionEmpty(questions) ?
            ()=>{}:handleEdit

          }>
            Save
          </div>
    </div>
  )
}

export default EditFaq