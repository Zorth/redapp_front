
use anyhow::Result;

#[tokio::test]
async fn dev() -> Result<()> {
    let hc = httpc_test::new_client("http://localhost:3000")?;

    // test root
    hc.do_get("/").await?.print().await?;
    // test hello
    hc.do_get("/hello").await?.print().await?;

    Ok(())
}
