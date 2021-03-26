import React from 'react'
import {
  ShowView,
  ReferenceManyField,
  ShowContextProvider,
  useShowContext,
  useShowController,
} from 'react-admin'
import AlbumSongs from './AlbumSongs'
import AlbumDetails from './AlbumDetails'
import AlbumActions from './AlbumActions'
import { Title } from '../common'

const AlbumShowLayout = (props) => {
  const { loading, ...context } = useShowContext(props)
  const { record } = context

  return (
    <>
      {record && <AlbumDetails {...context} />}
      {record && (
        <ReferenceManyField
          {...context}
          addLabel={false}
          reference="albumSong"
          target="album_id"
          sort={{ field: 'album', order: 'ASC' }}
          perPage={0}
          pagination={null}
        >
          <AlbumSongs
            resource={'albumSong'}
            exporter={false}
            actions={<AlbumActions record={record} />}
          />
        </ReferenceManyField>
      )}
    </>
  )
}

const AlbumTitle = ({ record }) => {
  return <Title subTitle={record.name} />
}

const AlbumShow = (props) => {
  const controllerProps = useShowController(props)
  return (
    <ShowContextProvider value={controllerProps}>
      <ShowView title={<AlbumTitle />}>
        <AlbumShowLayout {...props} {...controllerProps} />
      </ShowView>
    </ShowContextProvider>
  )
}

export default AlbumShow
