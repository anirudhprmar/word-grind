import React from 'react'
import type { Words } from '~/app/_wordsCollection/columns'
import { DataTable } from '~/app/_wordsCollection/data-table'

export default function SearchWordsModal(words:Words) {
    const AllWords:Words[] = words ?? []
    // const words:Words[] = data ?? []
  return (
    <div>
       <div className="container mx-auto py-10">
                <DataTable columns={columns} data={AllWords} userId={AllWords[0]?.userId ?? ""} />
              </div>
    </div>
  )
}
