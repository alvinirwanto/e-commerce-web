import { DotLoader } from 'react-spinners'

export default function DotLoaderSpinner({ loading }) {
    return (
        <div className='fixed inset-0 bg-light-black z-[100] grid place-items-center'>
            <DotLoader color="#2f82ff" loading={loading} />
        </div>
    )
}
