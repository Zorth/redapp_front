
use anyhow::Result;

#[tokio::test]
async fn root() -> Result<()> {
    let hc = httpc_test::new_client("http://localhost:3000")?;

    // test root
    hc.do_get("/").await?.print().await?;

    Ok(())
}

#[tokio::test]
async fn user() -> Result<()> {
    let hc = httpc_test::new_client("http://localhost:3000")?;

    // test user
    hc.do_get("/user").await?.print().await?;

    Ok(())
}

#[tokio::test]
async fn starchild_all() -> Result<()> {
    let hc = httpc_test::new_client("http://localhost:3000")?;

    // test user
    hc.do_get("/starchild/all").await?.print().await?;

    Ok(())
}

