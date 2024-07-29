import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'

import { UserDesktop } from './pages/UserDesktop'
import 'normalize.css'
import { BlogWriting } from './pages/BlogWriting'
import { ReadABlog } from './pages/ReadABlog'
import { UserProfile } from './pages/UserProfile'
import { PublicProfile } from './pages/PublicProfile'
import { NotificationPage } from './pages/NotificationPage'
import { EditProfile } from './pages/EditProfile'
import { SearchingPage } from './pages/SearchingPage'
import { Home } from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:username" element={<UserDesktop></UserDesktop>} />
          <Route path='/blog/:username/write' element={<BlogWriting></BlogWriting>}></Route>
          <Route path="/public/blog/:blogid" element={<ReadABlog></ReadABlog>}></Route>
          <Route path='/:username/profile' element={<UserProfile></UserProfile>}></Route>
          <Route path='/public/:username' element={<PublicProfile></PublicProfile>}></Route>
          <Route path='/:username/notification' element={<NotificationPage></NotificationPage>} />
          <Route path='/profile/:username/edit' element={<EditProfile></EditProfile>}></Route>
          <Route path="/search" element={<SearchingPage></SearchingPage>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App