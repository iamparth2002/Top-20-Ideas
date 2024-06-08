import React from 'react';
import { db } from '../../utils';
import { Ideas } from '../../utils/schema';
import { eq } from 'drizzle-orm';
import { alreadyDownVoted, alreadyVoted, downvote, upvote } from '../../utils/check';

const List = ({ list, refereshData }) => {
  const onUpVoteHandler = async (item) => {
    if (upvote(item.id)) {
        console.log('hi')
      const result = await db
        .update(Ideas)
        .set({
          vote: item.vote + 1,
        })
        .where(eq(Ideas.id, item.id))
        .returning({ id: Ideas.id });

      if (result) {
        refereshData();
      }
    }
  };
  const downVoteHandler = async (item) => {
    if(item.vote == 0) return
    if (downvote(item.id)) {
      const result = await db
        .update(Ideas)
        .set({
          vote: item.vote - 1,
        })
        .where(eq(Ideas.id, item.id))
        .returning({ id: Ideas.id });

      if (result) {
        refereshData();
      }
    }
  };
  return (
    <div className="flex flex-col gap-4 px-4 lg:mb-4">
      {list.map((item, index) => (
        <div
          key={index}
          className="flex justify-between p-5 lg:w-[1100px] rounded-xl shadow-lg"
        >
          
          <div className="flex gap-2 items-start ">
          <div className="mr-2">{index + 1}. </div>
          <div className='flex flex-col'>
          <h2 className=" text-left">{item.content}</h2>
            <p className="mt-3 text-left">
              By @{item.username} on {item.createdAt}
            </p>
          </div>
            
          </div>
          <div className="flex flex-col gap-3 lg:gap-1">
            <div
              size={10}
              className={`cursor-pointer hover:bg-gray-200 p-2 rounded-xl ${alreadyVoted(item.id) && 'bg-gray-200'}`}
              onClick={() => onUpVoteHandler(item)}
            >
              🔥
            </div>
            <div>{item.vote}</div>
            <div
              className={`cursor-pointer hover:bg-gray-200 p-2 rounded-xl ${alreadyDownVoted(item.id) && 'bg-gray-200'}`}
              onClick={() => downVoteHandler(item)}
            >
              👎
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
