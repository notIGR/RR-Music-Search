import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlbumView from './components/albumView'
import ArtistView from './components/artistView'
import Gallery from './components/Gallery'
import Searchbar from './components/Searchbar'
import { DataContext } from './context/DataContext'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if (search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])

	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div>
			<Searchbar handleSearch={handleSearch} />
			{message}
			<DataContext.Provider value={data}>
				<Gallery />
				<AlbumView />
				<ArtistView />
			</DataContext.Provider>
		</div>
	);
}

export default App;