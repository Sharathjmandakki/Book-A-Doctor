import React from 'react'

export default function NumData(props) {
    return (
        <div className='m-2 min-w-64'>
            <p class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700  ">
               <p class="font-normal text-gray-700 dark:text-gray-400 text-wrap text-center">{props.txt}</p>
               <hr className='text-gray-500'/>
               <h5 class="m-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.no}</h5>
            </p>
        </div>
    )
  }