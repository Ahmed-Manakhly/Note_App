import {createBrowserRouter , RouterProvider } from 'react-router-dom' ;
import RootLayout from './pages/RootLayout' ;
import ErrorPage from './pages/ErrorPage' ;
import {NewNote} from './pages/NewNote' ;
import { useMemo } from "react"
import { useLocalStorage } from "./Hooks/useLocalStorage" ;
import { v4 as uuidV4 } from "uuid" ;
import { NoteList } from "./pages/NoteList" ;
import { NoteLayout } from "./pages/NoteLayout" ;
import { Note } from "./pages/Note" ;
import { EditNote } from "./pages/EditNote" ;
import {useState} from 'react' ;
//-------------------------------------- types
export type NoteT = {
  id: string
} & NoteData

//--------------------------------------------------------------------

export type RawNote = {
  id: string
} & RawNoteData

//--------------------------------------------------------------------

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}
//--------------------------------------------------------------------
export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}
//--------------------------------------------------------------------
export type Tag = {
  id: string
  label: string
}
//----------------------------------------


function App() {
  //-----------------------------------
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  //------------------------------------------------------
  const [showTagsModal, setshowTagsModal] = useState(false) 
  const [fontData , setFontData] = useState('default') ;
  //----------------------------------------------- some function
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])
  // ----------------------------------
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }
  // ----------------------------------
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }
  // ----------------------------------
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }
  // ----------------------------------
  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }
  // ----------------------------------
  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }
  // ----------------------------------
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }
  //----------------------------------------------------------------------
  const TagsModalIsOpenHandler = ()=> {
    setshowTagsModal(true)
    
  } 
  //----------------------------------
  const TagsModalIsCloseHandler = ()=> {
    setshowTagsModal(false)
  } 
  //--------------------------------------
     //--------------------------------------
  const changeFontHandler = (font:string)=> {
      setFontData(font) ;
  }
  // -----------------------------
  const resetFontHandler = ()=> {
      setFontData('default') ;
  }
  //--------------------------------------------/ my routes
  const router = createBrowserRouter([
    {path: '/' , element : <RootLayout onClick={TagsModalIsOpenHandler} resetFont={resetFontHandler} changeFont={changeFontHandler}/>  , errorElement : <ErrorPage/> ,children:[
      {index : true , element : <NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={updateTag}
        onDeleteTag={deleteTag} show={showTagsModal} handleClose={TagsModalIsCloseHandler}/> },
      {path : 'new' , element : <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} /> },
      {path : ':id' , element : <NoteLayout notes={notesWithTags} /> ,children : [
        {index : true ,  element : <Note onDelete={onDeleteNote} />},
        {path : 'edit' , element : <EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />}
      ]}
        ]
      }
    ]
  )
  //----------------------------------------------------/ 
  
  return (
      <section className='mb-4 theRoot'  data-theme={fontData}>
        <RouterProvider router={router}/>
      </section>
  );
}

export default App ;