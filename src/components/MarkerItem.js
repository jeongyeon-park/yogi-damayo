const MarkerItem = ({ name, address, number }) => {

    return (
        <div className="MarkerItem">
            <div className="marker-name">{name}</div>
            <div className="marker-address">{address}</div>
            <div className="marker-number">{number}</div>
        </div>
    );
}

export default MarkerItem;