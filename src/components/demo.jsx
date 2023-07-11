import React from 'react'
import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const demo = () => {

  const [ article, setArticle ] = useState({
    url: '',
    summary: ''
  })

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({articleUrl: article.url})

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary}
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles)

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      console.log(newArticle);
    }
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form 
        className="relative flex justify-center items-center"
        onSubmit={() => handleSubmit}
        >
          <img 
          src={linkIcon} 
          alt="link_icon" 
          className="absolute left-0 my-2 ml-3 w-5" 
          />

          <input 
          type="url"
          placeholder='Enter a URL' 
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value})}
          required
          className='url_input peer'
          />

          <button 
          className="submit_btn peer-focus:border-grey-700 peer-focus:text-grey-700"
          type='submit'
          onClick={handleSubmit}
          >⮐</button>
          
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item,index) => (
            <div className="link_card" key={`link-${index}`} onClick={() => setArticle(item)}>
              <div className="copy_btn">
                <img src={copy} alt="copy_btn" className='w-[40%] h-[40%] object-contain'/>
              </div>
              <p className='flex-1 font-satoshi text-blue-700 truncate text-xs'>{item?.url}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items center">
        {isFetching ? (
          <img src={loader} className='w-20 h-20 object-contain'/>
        ) : error ? (
          <p>
            Well
            <br />
            <span>
              {error?.data.error}
            </span>
          </p>  
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>Article  
                <span className='blue_gradient'> Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm test-grey-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}

      </div>
    </section>
  )
}

export default demo