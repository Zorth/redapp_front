
use anyhow::Result;

const IP: &str = "http://192.168.0.100:3000";

#[tokio::test]
async fn root() -> Result<()> {
    let hc = httpc_test::new_client(IP)?;

    // test root
    hc.do_get("/").await?.print().await?;

    Ok(())
}

#[tokio::test]
async fn user() -> Result<()> {
    let hc = httpc_test::new_client(IP)?;

    // test user
    hc.do_get("/user").await?.print().await?;

    Ok(())
}

#[tokio::test]
async fn starchild_all() -> Result<()> {
    let hc = httpc_test::new_client(IP)?;

    // test user
    hc.do_get("/starchild/all").await?.print().await?;
    
    Ok(())
}

#[tokio::test]
async fn starchild_lock() -> Result<()> {
    let hc = httpc_test::new_client(IP)?;

    // test user
    hc.do_get("/starchild/Lock").await?.print().await?;
    
    Ok(())
}

