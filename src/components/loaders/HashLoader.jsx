import { HashLoader } from 'react-spinners'

export default function HashLoaderSpinner({ loading }) {
    return (
        <div className='fixed inset-0 bg-light-black z-[100] grid place-items-center'>
            <HashLoader color="#4949E4" loading={loading} />
        </div>
    )
}
