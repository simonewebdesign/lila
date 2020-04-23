class Lila < Formula
  desc "🌺 The little load balancer"
  homepage "https://github.com/simonewebdesign/lila"
  url "https://github.com/simonewebdesign/lila/archive/v1.0.0.tar.gz"
  sha256 "8606ab91b07106d30487863db1247ef0e1b4f31cd3ec0e66acdc6fbd08e4032f"

  def install
    bin.install "lila"
  end
end
