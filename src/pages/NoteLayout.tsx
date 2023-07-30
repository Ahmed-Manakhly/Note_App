import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { NoteT } from "../App" ;

type NoteLayoutProps = {
  notes: NoteT[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (note == null) return <Navigate to="/" replace />

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<NoteT>()
}