import "./deadsimplechat.js";

function ChatSDK() {
    const [sdk, setSDK] = useState(0);
    useEffect(()=>{
      (async () => {
        // DSChatSDK construction accepts two parameters:
        // 1. Chat Room Id
        // 2. ID of the iFrame tag
        // 3. Dead Simple Chat Public API Key.
        const sdk = new window.DSChatSDK("E7ZK4jZvQ", "UWC2.0", "pub_6153614c6555773741696a4378594e5f644d44662d6d485072467842576276447638326d6671356b355f537a396e625f")
        // Call the connect method to connect the SDK to the Chat iFrame.
        await sdk.connect();
        setSDK(sdk);
    })();
    }, [])
}
const Chat = () =>{
    return (
        <div className="chat-style">
            <iframe src="https://deadsimplechat.com/E7ZK4jZvQ" width="100%" height="600px"></iframe>      
        </div>
    );
};

export default Chat;