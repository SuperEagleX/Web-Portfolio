import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Writeups from './pages/Writeups'
import WriteupDetail from './pages/WriteupDetail'
import Cheatsheets from './pages/Cheatsheets'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="writeups" element={<Writeups />} />
        <Route path="writeups/:slug" element={<WriteupDetail />} />
        <Route path="cheatsheets" element={<Cheatsheets />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
