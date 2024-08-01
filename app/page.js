'use client'
import Image from "next/image";
import React,{useState,useEffect} from "react";
import {collection,addDoc,getDoc,QuerySnapshot, query, onSnapshot, deleteDoc,doc, updateDoc,} from 'firebase/firestore'
import {db} from './firebase'
export default function Home() {
  const [Items,setItems]=useState([])
  const [newItem,setNewitem]=useState({name:'',price:'',quantiy:''})
  const [total,SetTotal]=useState(0)
  const [deletequant,setDeletequant]=useState({})
  // add item,read item and delete item

  const additem=async(e)=>{ 
    e.preventDefault()
    if(newItem.name!=='' && newItem.price!=='' && newItem.quantiy!==''){
     // setItems([...Items,newItem])
     await addDoc(collection(db,'items'),{
      name:newItem.name.trim(),
      price:newItem.price,
      quantiy:newItem.quantiy,
     })
      
    //  SetTotal(newItem.price)
    }
    setNewitem({name:'',price:'',quantiy:''})

  }
  
  useEffect(()=>{
    const q=query(collection(db,'items'))
    const unsubscribe=onSnapshot(q,(QuerySnapshot)=>{
      let itemsarr=[]
      QuerySnapshot.forEach((doc)=>{
        itemsarr.push({...doc.data(),id:doc.id})
      })
      setItems(itemsarr)
      
      //read total from database
      const caltotal=()=>{
        const totalprice=itemsarr.reduce((sum,item)=>sum+parseFloat(item.price*item.quantiy),0)
        SetTotal(totalprice)
      }
      caltotal()  
      return ()=>unsubscribe()
    })
  },[])
  /*
  const removeitem=async(id)=>{
    const arr=Items.filter((item)=>item.id!==id)
    const sum=Items.find((item)=>item.id===id)
    const val=sum?parseFloat(sum.price):0
    const ans=total-val;

    setItems(arr)
    SetTotal(ans)
  }
    */
  const deleteitem=async(id)=>{
    /*
    const itemref=doc(db,'items',id)
    const itemdoc=await getDoc(itemref)
    const itemdata=itemdoc.data()

    if(itemdata.quantiy>quantitytodelete){
      await updateDoc(itemref,{
        quantiy:itemdata.quantiy-quantitytodelete
      })
    }
    else{
      await deleteDoc(itemref)
    }
      */
    await deleteDoc(doc(db,'items',id))
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center ">Pantry Tracker</h1>
        <h1 className="text-4xl p-4 text-center ">One Stop-solution for Managing all Tasks</h1>
        <div className="bg-slate-800 p-4 rounded-lg mx-24 mr-6px">
          <form className="grid grid-cols-7 items-center text-black">
            <input 
            value={newItem.name} 
            onChange={(e)=>setNewitem({...newItem,name:e.target.value})}
            className="col-span-2 p-3 mx-3 border" type="text" placeholder="Enter Item"/>
            <input 
            value={newItem.price} 
            onChange={(e)=>setNewitem({...newItem,price:e.target.value})}
            className="col-span-2 p-3 border mx-4" type="number" placeholder="Enter $"/>
             <input 
            value={newItem.quantiy} 
            onChange={(e)=>setNewitem({...newItem,quantiy:e.target.value})}
            className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter quantity"/>
            <button onClick={additem} className="text-white bg-slate-950 hover:bg-slate-900 p-4" type="submit">+</button>
          </form>
          <ul>
            {Items.map((item,id)=>(
              <li key={id} className="my-4 w-full flex justify-between bg-slate-900">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize text-white">{item.name}</span>
                  <span className="text-white">{item.price}</span>
                  <span className="text-white">{item.quantiy}</span>
                </div>
                
                <button onClick={()=>deleteitem(item.id)} className="text-white ml-8 p-4 border-l-2 border-slate-900 hover:border-slate-800 w-16">X</button>

              </li>
            ))}
            
          </ul>
          {Items.length<1? (''):(
            <div className="p-4 w-full flex justify-between">
              <span className="text-white">Total</span>
              <span className="text-white">${total.toFixed(2)}</span>
              </div>
          )}
            
        </div>
      </div>
    </main>
  );
}

/*
<input type="number" 
                value={deletequant[item.id]|| ''}    
                onChange={(e)=>setDeletequant({...deletequant,[item.id]:e.target.value})} 
                onBlur={(e)=>deleteitem(item.id,parseInt(e.target.value))}  
                className="text-white ml-8 p-4 border-l-2 border-slate-900 hover:border-slate-800 w-16 "
                placeholder="Enter quantity to delete"/>
                */