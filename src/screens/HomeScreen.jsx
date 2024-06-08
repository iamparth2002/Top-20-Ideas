import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { ThemeContext } from '../context/ThemeContext';
import Tabs from '../components/Tabs';
import List from '../components/List';
import { useLocation } from 'react-router-dom';
import { db } from '../../utils';
import { Ideas } from '../../utils/schema';
import { desc } from 'drizzle-orm';

const HomeScreen = () => {
  const params = useLocation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllIdeas();
  }, [params]);

  const getAllIdeas = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(Ideas)
      .orderBy(
        desc(
          params.hash == '#hot' || params.hash == '#new' ? Ideas.vote : Ideas.id
        )
      )
      .limit(20);
    if (result) {
      setList(result);
      setLoading(false);
    }
  };

  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col items-center pt-10 md:gap-10 gap-5">
      <Header />
      <h1 className=' text-3xl px-2 md:text-5xl font-semibold'>Top 20 productive ideas for your next startup</h1>
      <p className=" text-xl px-4">
        Like your favourites Ideas. Write your best Ideas, No account needed
      </p>
      <select
        onChange={(e) => setTheme(e.target.value)}
        className="select select-bordered select-lg w-full max-w-xs"
      >
        <option disabled selected>
          Select Theme
        </option>
        <option>light</option>
        <option>dim</option>
        <option>cupcake</option>
        <option>winter</option>
        <option>corporate</option>
      </select>
      <Tabs />
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <List list={list} refereshData={getAllIdeas} />
      )}
    </div>
  );
};

export default HomeScreen;
