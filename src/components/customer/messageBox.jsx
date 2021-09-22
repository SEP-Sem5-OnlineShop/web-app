export default function MessageBox(props) {
    return (
        <div className="p-4 rounded-3xl bg-white text-danger">
            {props.children}
        </div>
    )
}