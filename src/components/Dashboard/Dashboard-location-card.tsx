import { Card, Typography, Spin } from "antd";

import { useFetchLocationsQuery } from "@/app/slices/ghibli-api-slice"

const { Title, Text } = Typography;

export function DashboardLocationCard() {
    const { data = [], isFetching } = useFetchLocationsQuery();

    function getNumberOfLocations () : number {
        return data.length;
    }
    
    return (
        isFetching
            ? <div style={{
                display: "flex",
                margin: "auto",
                placeContent: "center",
                height: "100%",
                alignItems: "center"
            }}>
                <Spin size="large" className="darkText" />
            </div>
            : <Card title={
                <Title className={"darkText"} style={{
                    fontSize: "2rem"
                }} >
                    Realistic
                </Title>
            }

                style={{
                    width: "90%",
                    marginTop: "2rem"
                }}

            >

                <Text className="darkText">
                    Studio Ghibli films are known for their breathtaking visuals and imaginative locations. From the lush forests of <Text italic>My Neighbor Totoro</Text> to the steampunk city of Laputa: <Text italic>Castle in the Sky</Text>, these films transport viewers to worlds both familiar and strange.
                    <br />
                    Some of the <Text strong>{getNumberOfLocations()}</Text> locations seen in animated movies are inspired by real-world places while other are completely fictional. 
                </Text>

            </Card>
    )
} 