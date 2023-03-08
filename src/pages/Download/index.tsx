export default function Download() {
  return (
    <div>
      <h2>回测数据下载</h2>

      <a href="http://8.222.145.211:8082/api/download/spot/1d">
        Binance 现货价格-日线
      </a>
      <br />
      <br />
      <a href="http://8.222.145.211:8082/api/download/tvl/1d">TVL</a>
      <br />
      <br />
      {/* <a href="http://8.222.145.211:8082/api/download/erc20/user/1d">合约调用次数</a>
        <br />
        <br /> */}
      <div>
        更多数据上线中。提出你的数据诉求，更快上线:{' '}
        <a href="https://alidocs.dingtalk.com/i/nodes/3QD5Ea7xAo4VEXqz1B9rWG1YBwgnNKb0?iframeQuery=utm_source%3Dportal%26utm_medium%3Dportal_recent">
          反馈链接
        </a>
      </div>
    </div>
  );
}
