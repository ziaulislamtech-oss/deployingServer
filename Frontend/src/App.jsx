import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [notes, setNotes] = useState([])
  const [editId, setEditId] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    profileImg: ""
  })
  function handleChange(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (editId) {
      try {
        await axios.patch(`http://localhost:3000/api/notes/${editId}`, formData)
        setEditId(null)
        {
          const h1 = document.querySelector('#heading')
          const submitBtn = document.querySelector('#submit')
          h1.innerHTML = `Create Card`
          submitBtn.innerHTML = `Submit`
        }
      }
      catch (error) {
        console.log(error)
      }

    }
    else {

      try {
        const response = await axios.post("http://localhost:3000/api/notes", formData)
        console.log(response)
      }
      catch (error) {
        console.log(error)
      }

    }
    fetchNotes()
    setFormData({
      name: "",
      description: "",
      profileImg: ""
    })


  }
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes")
      console.log(response)
      setNotes(response.data.note)

    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`)

      fetchNotes()
    }
    catch (error) {
      console.log(error)
    }
  }
  const editNote = (note) => {
    setEditId(note._id)
    {
      const h1 = document.querySelector('#heading')
      const submitBtn = document.querySelector('#submit')
      h1.innerHTML = `Edit Card`
      submitBtn.innerHTML = `Edit Note`
    }
    setFormData({
      name: note.name,
      description: note.description,
      profileImg: note.profileImg
    })
  }
  useEffect(() => {

    fetchNotes()
  }, [])

  return (
    <>
     <div className="form">
      <h1 id='heading'>{editId ? "Edit Mode" : "Create New Card"}</h1>
      <form onSubmit={submitHandler}>
        <input name='name' value={formData.name} onChange={handleChange} placeholder='Full Name' />
        <input name='profileImg' value={formData.profileImg} onChange={handleChange} placeholder='Image URL' />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder='Details...'></textarea>
        
        <button id='submit'>{editId ? "Save Changes" : "Create Card"}</button>
        {editId && <button type="button" onClick={() => {setEditId(null); setFormData({name:"", description:"", profileImg:""})}} style={{marginTop:'10px', background:'transparent', color:'white', border:'1px solid white'}}>Cancel</button>}
      </form>

      {/* UNIQUE FEATURE: Live Preview */}
      {formData.name && (
        <div style={{marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px'}}>
          <p style={{fontSize: '12px', opacity: 0.6}}>Live Preview:</p>
          <div className="note" style={{opacity: 0.8, transform: 'scale(0.9)'}}>
             <img src={formData.profileImg || 'https://via.placeholder.com/150'} alt="" />
             <h2 style={{fontSize: '18px'}}>{formData.name}</h2>
             <p style={{fontSize: '14px'}}>{formData.description}</p>
          </div>
        </div>
      )}
    </div>
      <div className="notes" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1/3fr))', gap: '20px' }}>
        {notes.map((note) => (
          <div
            key={note._id}
            className="note"
            style={{
              // Unique Logic: Dim other cards when editing
              opacity: editId && editId !== note._id ? 0.4 : 1,
              transform: editId === note._id ? 'scale(1.1)' : 'scale(1)',
              border: editId === note._id ? '2px solid #3b82f6' : '1px solid #eee',
              transition: 'all 0.3s ease',
              filter: editId && editId !== note._id ? 'grayscale(80%)' : 'none'
            }}
          >
            <img src={note.profileImg} alt="" />
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <div className="btns">
              <button onClick={() => editNote(note)}>Edit</button>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
