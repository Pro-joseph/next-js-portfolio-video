import { PageSectionForm } from '../PageSectionForm'
import { upsertPageSection } from '../actions'

export default function NewPageSectionPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Page Section</h1>
      <PageSectionForm action={upsertPageSection} cancelHref="/admin/page-sections" />
    </div>
  )
}
