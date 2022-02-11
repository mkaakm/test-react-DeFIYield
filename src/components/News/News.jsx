import styles from './news.module.css'
import { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import newsOperations from '../../redux/news/news-operations';

import { fetchNews } from '../../redux/news/news-selectors'

import { compare } from './compare';

const News = () => {
    const ref = useRef()
    const state = useSelector(fetchNews)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [sortState, setSortState] = useState({ name: '', direction: 'decr' })
    const changeSort = (value) => {
        if (value === sortState.name) {
            const newDirection = sortState.direction === 'decr' ? 'incr' : 'decr'
            setSortState({ ...sortState, direction: newDirection })
        }
        else {
            setSortState({ name: value, direction: 'decr' })
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const { offsetTop } = entry.target;
                if (entry.isIntersecting && offsetTop > 700) {
                    setPage(page + 1)
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        dispatch(newsOperations.getNews(page))
    }, [page, ref])

    const { name, direction } = sortState;

    const sortItems = [...state].sort((firstItem, secondItem) => {
        if (direction === 'decr') {
            const result = compare(firstItem[name], secondItem[name])
            return result
        }
        else {
            const result = compare(secondItem[name], firstItem[name])
            return result
        }
    })

    const elements = sortItems.map(item =>
        <tr key={item.id}>
            <td className={styles.tableItem}>
                <a className={styles.link} target='_blank' href={item.url}>
                    {item.time_ago}</a>
            </td>
            <td className={styles.tableItem}>
                <a className={`${styles.link} ${styles.title}`} target='_blank' href={item.url}>
                    {item.title}
                </a>
            </td>
            <td className={styles.tableItem}>
                <a className={styles.link} target='_blank' href={item.url}>
                    {item.domain}
                </a>
            </td>
        </tr>
    );

    return (
        <>
            <button className={styles.sortBtn} onClick={() => changeSort('time')}>sort by table</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableItem} onClick={() => changeSort('time')}>Time</th>
                        <th className={styles.tableItem} onClick={() => changeSort('title')}>Title</th>
                        <th className={styles.tableItem} onClick={() => changeSort('domain')}>Domain</th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
            <div className={styles.nextPage} ref={ref}></div>
        </>
    )
}

export default News