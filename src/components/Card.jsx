import React, { useState } from 'react'


const Card = () => {

    const [searchData, setSearchData] = useState();
    const[data, setData] = useState ();

    const handleInput = (e) => {
        console.log(e.target.value);
        setSearchData(e.target.value);    
    }

    const handleApi = async() => {

        if (searchData.trim() === '') {
            console.log("Please enter a word to search.");
            alert("Please enter a word to search.");
            return;    
        }

        try {
            const getApi =await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchData}`)
            const jsonData = await getApi.json();
            console.log(jsonData);
            setData(jsonData[0]);

        } catch (error) {
            console.error('Error Fetching Data:', error);
            
        }
    };


  return (
    <div className='flex justify-center min-h-[30vh] scroll-auto'>
        <div className='flex flex-col  h-auto shadow-lg shadow-zinc-500/50 bg-zinc-200 p-8 rounded-lg'>
        <div>

            <input onChange={handleInput}
             value={searchData}
             className='outline-none focus:ring-2 focus:ring-violet-500 px-16 py-2 rounded mr-1 border border-gray-300'
             type="text" placeholder='Search Words'
            />

            <button onClick={handleApi}
             className='bg-violet-600 text-white font-medium rounded-md px-3 py-[8px]'>
             Search
            </button>
        </div>

        <div className='mt-4'>
            {
                data ? (
                    <div>
                        <h2>Word : {data.word}</h2>
                        <p>Part of Speech : {data.meanings[0].partOfSpeech}</p>
                        <p>Definition : {data.meanings[0].definitions[0].definition}</p>
                        
                        {data.meanings[0].synonyms?.length > 0 && (
                                <p>Synonyms: {data.meanings[0].synonyms.join(', ')}</p>
                        )}
                         
                        {data.meanings[0].definitions[0].example && (
                                <p>Example: {data.meanings[0].definitions[0].example}</p>
                        )}

                        <button onClick={() => window.open(data.sourceUrls[0])} className='bg-blue-600 rounded px-3 py-1 font-medium text-white mt-3'>Read more</button>
                       
                    </div>
                ) : (
                    <h1 className='font-bold text-2xl'>No meaning available......</h1>
                )
            }
        </div>

        </div>

       
    </div>
  )
}

export default Card