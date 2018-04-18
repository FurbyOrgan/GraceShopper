import React from 'react'

import {Navbar} from './components'
import {ReviewForm} from './components'

import Routes from './routes'


const App = () => {
  return (
    <div>
      <ReviewForm/>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
