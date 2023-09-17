import { Button, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function Home() {
    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate("/dashboard");
    }

    return (
        <div className="pageContent" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center"
        }}>

            <div className={"lightBackground"}>
                <Title className={"darkText"} style={{
                    fontSize: "5rem"
                }} >
                    Welcome
                </Title>

                <p> 
                    <Text className={"darkText"}>
                        This app is a simple test of React libraries with fetch API. <Button type='link' icon={<GithubOutlined />} href='https://github.com/fMuchka' target='_blank'>Created by fMuchka</Button>
                    </Text>
                </p>
                

                <p>
                    <Text className={"darkText"}>
                        Thank you to creators of <Button type='link' icon={<GithubOutlined />} href='https://github.com/deywersonp/ghibliapi' target='_blank'>Studio Ghibli API</Button> for providing the API end point with amazing data source.
                    </Text>
                </p>

                <p>
                    <Text className={"darkText"}>
                        This app uses their data on Studio Ghibli movies and visualizes them in various ways. Feel free to have a look. 
                    </Text>
                </p>
            </div>
            
            <div>
                <Button className="button"
                    
                    onClick={ handleButtonClick }
                    style={{
                        fontSize: "2rem",
                        height: "fit-content"
                }}>
                    Start Exploring
                </Button>
            </div>
            
        </div>
    )
}

export default Home